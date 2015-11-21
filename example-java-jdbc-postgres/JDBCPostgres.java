import java.sql.*;
import java.util.*;

public class JDBCPostgres {
  public static void main(String[] args) {
    Connection conn = null;
    try
    {
      Class.forName("org.postgresql.Driver");
      String url = System.getenv("JDBC_POSTGRES_URI");
      conn = DriverManager.getConnection(url);
    }
    catch (ClassNotFoundException e)
    {
      e.printStackTrace();
      System.exit(1);
    }
    catch (SQLException e)
    {
      e.printStackTrace();
      System.exit(2);
    }

    System.out.println("Postgres Connection Successful!");
  }
}
