package com.github.yukkimoru.modex;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class DataController {

    @Autowired
    private SQL sql;

    @GetMapping("/api/data")
    public List<DataPoint> getData() {
        return sql.readTemperatures();
    }
}