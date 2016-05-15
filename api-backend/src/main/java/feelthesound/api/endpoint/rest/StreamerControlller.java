package feelthesound.api.endpoint.rest;

import feelthesound.api.model.Streamer;
import feelthesound.api.service.ListenerRegistry;
import feelthesound.api.service.StreamerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class StreamerControlller {

    @Autowired
    private StreamerService service;

    @RequestMapping(value = "/rest/streams/{subscriberId}", method = RequestMethod.GET)
    @ResponseBody
    public Streamer getStreamer(@PathVariable String subscriberId) {
        return service.getStreamer(subscriberId);
    }
}

