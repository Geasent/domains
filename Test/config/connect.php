<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
$conn = mysqli_connect('localhost', 'root', 'root', 'SD');

if (!$conn) {
    echo 'error';
}