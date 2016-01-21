import java.net.*;
import java.io.*;


public class HelloWorld {

    public static void loop() {
	try {
	System.out.print("Hello, World");
	Thread.sleep(15000);
	loop();
	} catch (Exception loop) {
	}
    }

    public static void main(String[] args) throws Exception {
	loop();
    }
}
