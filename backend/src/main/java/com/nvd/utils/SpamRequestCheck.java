package com.nvd.utils;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;


// định nghĩa annotation để kiểm tra request spam
@Target(ElementType.METHOD) // chỉ sử dụng cho method
@Retention(RetentionPolicy.RUNTIME) // @SpamRrequestCheck sẽ được giữ lại trong thời gian chạy (runtime)
// định nghĩa một annotation trong Java
public @interface SpamRequestCheck {
}
