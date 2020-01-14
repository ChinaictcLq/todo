/**
* Copyright (c) 中徽建技术有限公司
*/
package com.ahccc.demo.todo;

import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

/**
 * @author lichunqing
 * @date 2019-04-19
 */
public class ServletInitializer extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(TodoServerApplication.class);
    }

}
