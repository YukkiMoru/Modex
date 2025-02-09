package com.github.yukkimoru.modex;

public class DataPoint {
    private int x;
    private double y;

    // コンストラクタ、ゲッター、セッター
    public DataPoint(int x, double y) {
        this.x = x;
        this.y = y;
    }

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }
}
