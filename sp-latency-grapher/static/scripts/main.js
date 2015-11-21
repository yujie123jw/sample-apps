$(function() {
  var data;
    var parseDate = d3.time.format.utc('%Y-%m-%dT%H:%M:%S.%LZ').parse,
      NS_PER_MS = 1000000.0;

    var totalWidth = document.documentElement.clientWidth;

    var margin = {top: 50, right: 70, bottom: 30, left: 50},
        width = totalWidth - margin.left - margin.right,
        height = 420 - margin.top - margin.bottom;

    var x = d3.time.scale()
        .rangeRound([0, width]);

    var y = d3.scale.linear()
        .rangeRound([height, 0]); // inverted so bigger is up

    var xAxis = d3.svg.axis()
        .scale(x)
        .ticks(d3.time.seconds, 30)
        .tickSubdivide(true)
        .orient('bottom');

    var yAxis = d3.svg.axis()
        .scale(y)
        .ticks(6)
        .tickSubdivide(true)
        .orient('left');

    var area = d3.svg.area()
        .interpolate('monotone')
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });

    var totalArea = d3.svg.area()
        .interpolate('monotone')
        .x(function(d) { return x(d.date); })
        .y0(height)
        .y1(function(d) { return y(d.latency); });

    var totalLine = d3.svg.line()
        .interpolate('monotone')
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.latency); });

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });

    var svg = d3.select('#chart').append('svg')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
        .append('g')
            .attr('transform', 'translate('+margin.left+','+margin.top+')');

    svg.append('clipPath')
            .attr('id', 'clip')
        .append('rect')
            .attr('width', width)
            .attr('height', height);

    var staticLabels = ['PreHookLatency', 'ServerResponseLatency', 'TotalLatency'];
    var staticColor = d3.scale.ordinal()
        .domain(staticLabels)
        .range(colorbrewer.BuPu[8].splice(3,6));

    d3.json('/data/10/m', function(err, d) {
      data = d.data;
      var hookNames = [];
      data.forEach(function(d) {
        d.date = parseDate(d.date);
        hookNames = hookNames.concat(
          d3.keys(d).filter(function(k) {return (/^Hook:/).test(k);})
        );
      });
      x.domain([parseDate(d.min), parseDate(d.max)]);

      var hooks = d3.set(hookNames).values().sort();
      var stackLabels = [staticLabels[0]].concat(hooks).concat(staticLabels[1]);
      var stackColors = d3.scale.ordinal()
          .domain(hooks)
          .range(colorbrewer.YlGnBu[d3.max([3, d3.min([7, hooks.length])])]);

      var color = function(key) {
        if (stackColors.domain().indexOf(key) >= 0) {
          return stackColors(key);
        } else {
          return staticColor(key);
        }
      };

      var latencies = stack(stackLabels.map(function(name) {
        return {
          name: name,
          values: data.map(function(d) {
            return {date: d.date, y: (+d[name] / NS_PER_MS) || 0};
          })
        };
      }));

      var totals = [{
        name: 'TotalLatency',
        values: data.map(function(d) {
          return {date: d.date, latency: + d.TotalLatency / NS_PER_MS};
        })
      }];

      y.domain([0, d3.max(totals[0].values, function(d) { return d.latency; }) * 1.1]).nice();

      // Draw
      var total = svg.selectAll('.total')
          .data(totals)
        .enter().append('g')
          .attr('class', 'total');

      total.append('path')
          .attr('class', 'area')
          .attr('clip-path', 'url(#clip)')
          .attr('d', function(d) { return totalArea(d.values); })
          .style('fill', function(d) { return color(d.name); });

      total.append('path')
          .attr('class', 'line')
          .attr('clip-path', 'url(#clip)')
          .attr('d', function(d) { return totalLine(d.values); })
          .style('stroke', function(d) { return color(d.name); });

      var latency = svg.selectAll('.latency')
              .data(latencies)
          .enter().append('g')
              .attr('class', 'latency');

      latency.append('path')
            .attr('class', 'area')
            .attr('clip-path', 'url(#clip)')
            .attr('d', function(d) { return area(d.values); })
            .style('fill', function(d) { return color(d.name); });

      // Draw axes
      svg.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,'+height+')')
            .call(xAxis);

      svg.append('g')
            .attr('class', 'y-axis')
            .call(yAxis)
        .append('text')
            .attr('class', 'y-axis')
            .attr('x', 6)
            .attr('dy', '.333em')
            .style('text-anchor', 'start')
            .text('Latency (ms)');

      // Draw Legend
      var legendData = [];
      while (staticLabels.length > 0) { legendData.push(staticLabels.splice(0, 3)); }

      var lrow = d3.select('#legend')
          .selectAll('.legend')
              .data(legendData)
          .enter().append('span')
              .attr('class', 'legend');

      lrow.selectAll('.legend .cell')
          .data(function(d) { return d; })
          .enter().append('div')
              .attr('class', 'row')
              .attr('class', 'text col-md-3')
              .style('color', function(d, i) {
                  return color(d);
              })
              .text(function(d, i) {
                  return d;
              });
    });
});
