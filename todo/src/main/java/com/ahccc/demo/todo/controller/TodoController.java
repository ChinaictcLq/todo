/**
* Copyright (c) 中徽建技术有限公司
*/
package com.ahccc.demo.todo.controller;

import java.util.List;
import javax.annotation.Resource;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import org.springframework.web.bind.annotation.*;

import com.ahccc.demo.todo.service.ITodoService;
import com.ahccc.demo.todo.entity.Todo;

import com.ahccc.framework.mybatis.base.controller.BaseController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author lichunqing
 * @date 2019-04-19
 */
@RestController
@RequestMapping("todo")
public class TodoController extends BaseController {

    @Resource
    private ITodoService iTodoService;

    @RequestMapping(value = "/{id}")
    public Todo get(@PathVariable long id) {
            return iTodoService.getById(id);
    }

    @RequestMapping(value = "/save")
    public void save(@RequestBody Todo entity) {
        iTodoService.save(entity);
    }

    @RequestMapping(value = "/remove")
    public void remove(@RequestBody List<String> ids) {
        iTodoService.removeByIds(ids);
    }

    @RequestMapping(value = "/update")
    public void update(@RequestBody Todo entity) {
        iTodoService.updateById(entity);
    }

    @RequestMapping(value = "/list")
    public List<Todo> list() {
        return iTodoService.list();
    }

    @RequestMapping(value = "/page")
    public IPage<Todo> page(Page<Todo> page) {
        QueryWrapper<Todo> queryWrapper = new QueryWrapper<>();
        return iTodoService.page(page, queryWrapper);
    }


    @RequestMapping(value = "/test3wform")
    public String test3wform(String t1, String t2,
                           @RequestParam(required = false, value = "ids[]") String[] ids1,
                           @RequestParam(required = false, value = "ids[]") List<String> ids2){
        System.out.println("test3wform t1: " + t1);
        System.out.println("test3wform ids1: " + ids1);
        System.out.println("test3wform ids2: " + ids2);
        return "test3wform";
    }

    @RequestMapping(value = "/testappjson/{name}")
    public String testappjson(@PathVariable String name, @RequestParam String var, @RequestBody Todo todo){
        System.out.println("testappjson name: " + name);
        System.out.println("testappjson var: " + var);
        System.out.println("testappjson todo: " + todo.toString());
        return "testappjson";
    }

    @RequestMapping(value = "/testget/{name}")
    public String testget(@PathVariable String name, @RequestParam String var){
        System.out.println("testget name: " + name);
        System.out.println("testget var: " + var);
        return "testget";
    }

}
