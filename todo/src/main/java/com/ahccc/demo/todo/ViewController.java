/**
* Copyright (c) 中徽建技术有限公司
*/
package com.ahccc.demo.todo;

import com.ahccc.framework.mybatis.base.config.property.ServerProperty;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;

@Controller
@RequestMapping("/view")
public class ViewController {

   @Resource
   private ServerProperty serverProperty;

   @ModelAttribute
   public void initModel(Model model) {
      model.addAttribute("gateway", serverProperty.getGateway());
   }

   @RequestMapping("/todo")
   public String todo() {
      return "view/todo/todo";
   }

   @RequestMapping("/init")
   public String init() {
      return "view/test/init";
   }

   @RequestMapping("/test/todo")
   public String testTodo() {
      return "view/test/todo";
   }

   @RequestMapping("/test")
   public String test() {
      return "view/test/test";
   }
}