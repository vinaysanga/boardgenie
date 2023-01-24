package com.vinay.boardgenie.service;

import com.vinay.boardgenie.bean.Task;
import com.vinay.boardgenie.repository.TaskRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Slf4j
public class BoardService {

    private final TaskRepository taskRepository;

    @Autowired
    public BoardService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Get task from id
     *
     * @param id The task id
     * @return The task having given id, else <code>null</code>
     */
    public Task getTask(Long id) {
        return taskRepository.findById(id).orElse(null);
    }

    /**
     * Get all tasks
     *
     * @return List of tasks
     */
    public List<Task> getAllTasks() {
        Iterable<Task> tasks = taskRepository.findByOrderByIdDesc();
        return StreamSupport.stream(tasks.spliterator(), false).collect(Collectors.toList());
    }

    /**
     * Saves list of tasks
     *
     * @param tasks List of tasks
     */
    public void saveAllTasks(List<Task> tasks) {
        taskRepository.saveAll(tasks);
    }

    /**
     * Delete all tasks with given ids
     *
     * @param ids The task ids to be deleted
     */
    public void deleteByIds(List<Long> ids) {
            taskRepository.deleteAllById(ids);
    }
}
