/**
* Copyright (c) 中徽建技术有限公司
*/
package com.ahccc.demo.todo.service.impl;

import com.ahccc.demo.todo.entity.Todo;
import com.ahccc.demo.todo.mapper.TodoMapper;
import com.ahccc.demo.todo.service.ITodoService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author lichunqing
 * @date 2019-04-19
 */
@Service
public class TodoServiceImpl extends ServiceImpl<TodoMapper, Todo> implements ITodoService {

}
