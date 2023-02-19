package shop.kong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MemoController {

    @RequestMapping("/memo")
	public String meno() {
		return "memo/memo";
	}
		
}
