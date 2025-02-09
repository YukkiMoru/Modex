package com.github.yukkimoru.modex;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataController {

    public record Data(String name, int uv, int pv, int amt) { // クラスをパブリックに変更
    }

    @GetMapping("/api/data")
    public List<Data> getData() {
        return List.of(
            new Data("Page A", 400, 400, 100),
            new Data("Page B", 100, 200, 200),
            new Data("Page C", 300, 10, 300)
        );
    }
}