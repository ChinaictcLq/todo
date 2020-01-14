/**
 * Copyright (c) 中徽建技术有限公司
 */
package com.ahccc.demo.todo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * @author lichunqing
 * @date 2019-04-19
 */
@SpringBootApplication(scanBasePackages = {"com.ahccc.framework.mybatis", "com.ahccc.demo.todo"})
@MapperScan("com.ahccc.demo.todo.mapper")
public class TodoServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(TodoServerApplication.class, args);
    }
}
