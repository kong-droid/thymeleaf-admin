package site.kongdroid.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class UserController {

    @RequestMapping("/")
    public String signIn() {
        return "main/login";
    }
    
    @RequestMapping("/sign-up")
    public String signUp() {
        return "main/sign_up";
    }
    
    @RequestMapping("/mypage")
    public String mypage() {
        return "mypage/mypage";
    }
    
}
