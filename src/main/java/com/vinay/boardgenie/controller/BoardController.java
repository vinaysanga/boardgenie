package com.vinay.boardgenie.controller;

import com.vinay.boardgenie.bean.Response;
import com.vinay.boardgenie.bean.Task;
import com.vinay.boardgenie.service.BoardService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/")
@CrossOrigin(origins = "http://localhost:3000/")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping(value = "/getTask", produces = {"application/json"})
    public Task getTask(@RequestParam Long id) throws InterruptedException {
        return boardService.getTask(id);
    }

    @GetMapping(value = "/getAllTasks")
    public List<Task> getAllTasks(){
        return boardService.getAllTasks();
    }

    @PostMapping("/saveTask")
    public Boolean saveTask(@RequestBody Task task){
        return boardService.saveAllTasks(Collections.singletonList(task));
    }

    @PostMapping("/saveAllTasks")
    public Boolean saveAllTasks(@RequestBody List<Task> tasks){
        return boardService.saveAllTasks(tasks);
    }

    @PatchMapping("/patchTask")
    public ResponseEntity<Response> updateTask(@Valid @RequestBody Task task, Errors errors){
        if(errors.hasErrors()) {
            Response response = new Response(HttpStatus.BAD_REQUEST, errors.getFieldError("id").getDefaultMessage());
            return ResponseEntity.badRequest().body(response);
        }
        boardService.saveAllTasks(Collections.singletonList(task));
        Response response = new Response(HttpStatus.OK, "Task having id " + task.getId() + " updated successfully!");
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @DeleteMapping("/deleteTaskById")
    public Boolean deleteTaskById(@RequestParam Long id){
        return boardService.deleteByIds(Collections.singletonList(id));
    }

    @DeleteMapping("/deleteTasksByIds")
    public Boolean deleteTasksByIds(@RequestBody List<Long> ids){
        return boardService.deleteByIds(ids);
    }

    @GetMapping("/logout")
    public Boolean logout(HttpServletRequest request, HttpServletResponse response){
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if(auth != null) {
            new SecurityContextLogoutHandler().logout(request, response, auth);
            return  true;
        }
        return false;
    }
}
