package shop.kong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SignController {
	
	@RequestMapping("/")
	public String signIn() {
		return "main/login";
	}
	
	@RequestMapping("/sign-up")
    public String signUp() {
        return "main/sign_up";
    }
	
}
