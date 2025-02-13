package com.github.yukkimoru.modex;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class executePython {
    public static void main(String[] args) {
        try {
            ProcessBuilder pb = new ProcessBuilder("python", "backend/src/main/resources/hello.py");
            pb.redirectErrorStream(true);
            Process process = pb.start();

            try (BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()))) {
                String line;
                while ((line = reader.readLine()) != null) {
                    System.out.println(line);
                }
            }

            int exitCode = process.waitFor();
            System.out.println("Exited with code: " + exitCode);
        } catch (IOException | InterruptedException e) {
            e.printStackTrace();
        }
    }
}