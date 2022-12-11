package com.vinay.boardgenie.bean;

import lombok.Data;
import org.springframework.http.HttpStatusCode;

@Data
public class Response {
    private final HttpStatusCode httpStatus;
    private final String message;
}
