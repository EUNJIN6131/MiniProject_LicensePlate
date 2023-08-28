package plate.back.controller;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import plate.back.dto.HistoryDto;
import plate.back.dto.LogDto;
import plate.back.dto.ResponseDto;
import plate.back.service.LogService;

@RestController
public class LogController {
    @Autowired
    LogService logService;

    @PostMapping("/main/record") // 3번
    public ResponseEntity<?> recordLog(@RequestPart(value = "file") MultipartFile file) {
        try {
            System.out.println("FIle : " + file);
            List<LogDto> list = logService.recordLog(file);
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().data(list).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/main/search/date") // 4번
    public ResponseEntity<?> searchDate(Date start, Date end) {
        try {
            List<LogDto> list = logService.searchDate(start, end);
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().data(list).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/main/search/plate/{plate}") // 5번
    public ResponseEntity<?> searchPlate(@PathVariable String plate) {
        try {
            List<LogDto> list = logService.searchPlate(plate);
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().data(list).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/main/history") // 6번
    public ResponseEntity<?> getHistory() {
        try {
            List<HistoryDto> list = logService.getHistory();
            ResponseDto<HistoryDto> response = ResponseDto.<HistoryDto>builder().data(list).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<HistoryDto> response = ResponseDto.<HistoryDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/main/update") // 7번
    public ResponseEntity<?> updateLog(@RequestBody LogDto dto) {
        try {
            List<Boolean> isUpdated = logService.updateLog(dto);
            ResponseDto<Boolean> response = ResponseDto.<Boolean>builder().data(isUpdated).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/main/delete") // 8번
    public ResponseEntity<?> deleteLog(List<LogDto> list) {
        try {
            List<Boolean> isDeleted = logService.deleteLog(list);
            ResponseDto<Boolean> response = ResponseDto.<Boolean>builder().data(isDeleted).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}