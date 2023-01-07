package com.vinay.boardgenie.repository;

import com.vinay.boardgenie.bean.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    Iterable<Task> findByOrderByIdDesc();
}
