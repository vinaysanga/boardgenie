package com.vinay.boardgenie.controller;

import com.vinay.boardgenie.bean.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionController {

    @ExceptionHandler
    public ResponseEntity<Response> handleException(Exception e){
        Response response = new Response(HttpStatus.INTERNAL_SERVER_ERROR, "Exception Handled: "+e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}
