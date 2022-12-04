package shop.kong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
@RequestMapping("/post")
public class PostController {

	@GetMapping("/notice")
	public String notice() {
		return "post/post";
	}
	
	@GetMapping("/faq")
	public String faq() {
		return "post/post";
	}
	
	@GetMapping("/event")
	public String event() {
		return "post/post";
	}
	
	@GetMapping("/handle")
	public String postHandle() {
		return "post/post_edit";
	}
	
}
