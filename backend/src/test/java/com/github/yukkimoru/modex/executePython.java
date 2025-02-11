package com.github.yukkimoru.modex;

import org.graalvm.polyglot.Context;
import org.graalvm.polyglot.Source;
import org.graalvm.polyglot.Value;

import java.io.File;
import java.io.IOException;

public class executePython {
    public static void main(String[] args) {
        try (Context context = Context.newBuilder().allowAllAccess(true).build()) {
            File file = new File("src/test/java/com/github/yukkimoru/modex/sum.py");
            Source source = Source.newBuilder("python", file).build();
            Value result = context.eval(source);
            System.out.println(result);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}