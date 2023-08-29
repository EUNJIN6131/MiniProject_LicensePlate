package plate.back.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FileService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public String uploadFile(MultipartFile file, String directory) throws IOException {
        String fileName = directory + UUID.randomUUID();
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getInputStream().available());

        amazonS3.putObject(
                new PutObjectRequest(bucket, fileName, file.getInputStream(), objectMetadata)
        // .withCannedAcl(CannedAccessControlList.PublicRead)); // 누구나 파일 읽기 가능
        );
        String url = amazonS3.getUrl(bucket, fileName).toString();
        return url;
    }

    // public void update(String oldSource, String newSource) {
    // try {
    // oldSource = URLDecoder.decode(oldSource, "UTF-8");
    // newSource = URLDecoder.decode(newSource, "UTF-8");
    // } catch (UnsupportedEncodingException e) {
    // e.printStackTrace();
    // }

    // moveS3(oldSource, newSource);
    // deleteS3(oldSource);
    // }
}
