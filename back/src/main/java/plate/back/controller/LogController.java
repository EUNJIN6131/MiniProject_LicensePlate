package plate.back.controller;

import java.util.ArrayList;
import java.util.List;

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

import lombok.RequiredArgsConstructor;
import plate.back.dto.HistoryDto;
import plate.back.dto.LogDto;
import plate.back.dto.ResponseDto;
import plate.back.service.LogService;

@RequiredArgsConstructor
@RestController
public class LogController {

    private final LogService logService;

    // 3. 차량 출입 로그 기록
    @PostMapping("/main/record")
    public ResponseEntity<?> recordLog(@RequestPart(value = "file") MultipartFile file) {
        try {
            List<LogDto> list = logService.recordLog(file);
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().data(list).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            String error = e.getMessage();
            ResponseDto<LogDto> response = ResponseDto.<LogDto>builder().error(error).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    // 4. 날짜별 로그 조회 yy-MM-dd
    @GetMapping("/main/search/date/{start}/{end}")
    public ResponseEntity<?> searchDate(@PathVariable String start, @PathVariable String end) {
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

    // 5. 차량 번호별 로그 조회
    @GetMapping("/main/search/plate/{plate}")
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

    // 6. 수정/삭제 기록 조회
    @GetMapping("/main/history")
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

    // 7. 로그 수정(admin)
    @PutMapping("/main/update")
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

    // 8. 로그 삭제(admin)
    @DeleteMapping("/main/delete")
    public ResponseEntity<?> deleteLog(@RequestBody ArrayList<LogDto> list) {
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