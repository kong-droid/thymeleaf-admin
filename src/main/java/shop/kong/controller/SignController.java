package shop.kong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SignController {
	
	@GetMapping("/")
	public String signIn() {
		return "main/login";
	}
	
}
