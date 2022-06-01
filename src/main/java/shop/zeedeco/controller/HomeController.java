package shop.zeedeco.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@RequestMapping("/home")
@Controller
public class HomeController {
	
	@GetMapping("/index")
	public ModelAndView homeIndex() {
		ModelAndView mav = new ModelAndView();
		mav.addObject("id", 	"fakeAdmin");
		mav.addObject("name", 	"KongPae");
		mav.setViewName("main/index");
		return mav;
	}
}
