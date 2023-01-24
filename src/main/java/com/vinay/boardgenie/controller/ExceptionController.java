package com.vinay.boardgenie.controller;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * The Exception controller which will intercept all the exceptions.
 */
@ControllerAdvice
@Slf4j
public class ExceptionController extends ResponseEntityExceptionHandler {

    /**
     * Intercepts all the exceptions and returns the appropriate response.
     * @param exception The exception caught
     * @return The error response
     */
    @ExceptionHandler
    protected ResponseEntity<String> handleException(Exception exception){
        return ResponseEntity.internalServerError().body(exception.getMessage());
    }
}
