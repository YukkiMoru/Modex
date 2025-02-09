package com.github.yukkimoru.modex;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
public class DataController {

    @GetMapping("/api/data")
    public List<DataPoint> getData() {
        return IntStream.rangeClosed(1, 10)
                .mapToObj(i -> new DataPoint(i, Math.random() * 10))
                .collect(Collectors.toList());
    }
}

