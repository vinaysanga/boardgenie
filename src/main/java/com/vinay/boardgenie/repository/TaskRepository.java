package com.vinay.boardgenie.repository;

import com.vinay.boardgenie.bean.Task;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository to interact with the database. It extends {@link CrudRepository},
 * hence most of the functionality is already implemented.
 *
 * @author vinaysanga
 */
@Repository
public interface TaskRepository extends CrudRepository<Task, Long> {

    /**
     * Find task by ID, Order Descending
     *
     * @return An iterable containing all the tasks ordered by IDs in descending order
     */
    Iterable<Task> findByOrderByIdDesc();
}
