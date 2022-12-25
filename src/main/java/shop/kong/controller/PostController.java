package shop.kong.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	public String postHandleByAdd() {
		return "post/post_edit";
	}
	
	@RequestMapping("/handle/{postSeq}")
    public ModelAndView postHandleByEdit(@PathVariable String postSeq) {
	    ModelAndView mv = new ModelAndView();
	    mv.addObject("postSeq", postSeq);
	    mv.setViewName("post/post_edit");
        return mv;
    }
}
