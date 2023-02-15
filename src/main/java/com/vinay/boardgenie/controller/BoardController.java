package com.vinay.boardgenie.controller;

import com.vinay.boardgenie.bean.Task;
import com.vinay.boardgenie.service.BoardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

/**
 * The REST controller which defines all the valid endpoints.
 *
 * @author vinaysanga
 */
@RestController
@RequestMapping("/api/")
public class BoardController {

    private final BoardService boardService;

    @Autowired
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    @GetMapping(value = "/getTask")
    public Task getTask(@RequestParam Long id) {
        return boardService.getTask(id);
    }

    @GetMapping(value = "/getAllTasks")
    public List<Task> getAllTasks() {
        return boardService.getAllTasks();
    }

    @PostMapping("/saveTask")
    public ResponseEntity<String> saveTask(@RequestBody Task task) {
        boardService.saveAllTasks(Collections.singletonList(task));
        return ResponseEntity.ok().body("Task saved successfully.");
    }

    @PatchMapping("/patchTask")
    public ResponseEntity<String> updateTask(@Valid @RequestBody Task task, Errors errors) {
        if (errors.hasErrors()) {
            return ResponseEntity.badRequest().body(Objects.requireNonNull(errors.getFieldError("id")).getDefaultMessage());
        }
        boardService.saveAllTasks(Collections.singletonList(task));
        return ResponseEntity.ok().body("Task updated successfully.");
    }

    @DeleteMapping("/deleteTaskById")
    public ResponseEntity<String> deleteTaskById(@RequestParam Long id) {
        boardService.deleteByIds(Collections.singletonList(id));
        return ResponseEntity.ok().body("Task deleted successfully.");
    }

}
