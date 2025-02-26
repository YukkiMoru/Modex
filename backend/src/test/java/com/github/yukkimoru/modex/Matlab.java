package com.github.yukkimoru.modex;

import com.mathworks.engine.*;

public class Matlab {
    public static void main(String[] args) throws Exception {
        MatlabEngine eng = MatlabEngine.startMatlab();
        eng.close();
    }
}
