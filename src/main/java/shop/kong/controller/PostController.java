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

    @RequestMapping("/{boardSeq}")
	public String notice(@PathVariable String boardSeq) {
		return "post/post";
	}
		
	@RequestMapping("/handle")
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
