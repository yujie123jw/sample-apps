# littleBits Stager

This stager integrates with the littleBits cloudBit module. It can send notifications using their cloud API when staging applications within the Apcera Platform.

You can view the littleBits API at:
http://developers.littlebitscloud.cc

## Installation

First setup the LITTLEBITS_AUTH in `stager.rb` and tune any other constants in that file.

Then deploy your stager to the Apcera Platform.

```console
$ apc stager create /example/stagers::littlebits --start-command="./stager.rb" --staging=/apcera::ruby -ae
```

Next append the stager to any staging pipeline you wish to send littleBits notifications.

```console
$ apc staging pipeline append /apcera::ruby /example/stagers::littlebits
```

Now you should receive notifications whenever you deploy an application using that Staging Pipeline!
