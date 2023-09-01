package plate.back.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CopyObjectRequest;
import com.amazonaws.services.s3.model.DeleteObjectsRequest;
import com.amazonaws.services.s3.model.DeleteObjectsRequest.KeyVersion;
import com.amazonaws.services.s3.model.DeleteObjectsResult;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class FileService {

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final String[] directories = { "total/vehicle/", "total/plate/", "relearn/vehicle/", "relearn/plate/" };
    private final AmazonS3 amazonS3;

    // 파일 업로드
    public String[] uploadFile(MultipartFile file, int dirIdx) throws IOException {
        String fileName = UUID.randomUUID().toString() + ".jpg";
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getInputStream().available());

        PutObjectResult result = amazonS3.putObject(
                new PutObjectRequest(bucket, directories[dirIdx] + fileName, file.getInputStream(), objectMetadata)
        // .withCannedAcl(CannedAccessControlList.PublicRead)); // 누구나 파일 읽기 가능
        );
        String url = amazonS3.getUrl(bucket, directories[dirIdx] + fileName).toString();
        return new String[] { url, fileName };
    }

    // 파일 이동(복사)
    public Map<String, String> moveFile(String vehicleImgTitle, String plateImgTitle) {
        Map<String, String> urlMap = new HashMap<>();
        urlMap.put("vehicle", amazonS3.getUrl(bucket, directories[2] + vehicleImgTitle).toString());
        urlMap.put("plate", amazonS3.getUrl(bucket, directories[3] + plateImgTitle).toString());

        CopyObjectRequest[] copyObjRequests = new CopyObjectRequest[2];

        copyObjRequests[0] = new CopyObjectRequest(bucket, directories[0] + vehicleImgTitle, bucket,
                directories[2] + vehicleImgTitle);
        copyObjRequests[1] = new CopyObjectRequest(bucket, directories[1] + plateImgTitle, bucket,
                directories[3] + plateImgTitle);

        for (CopyObjectRequest copyObjectRequest : copyObjRequests) {
            amazonS3.copyObject(copyObjectRequest);
        }

        return urlMap;
    }

    // 파일 삭제
    public void deleteFile(String vehicleImgTitle, String plateImgTitle) {
        List<KeyVersion> keysToDelete = new ArrayList<>();

        keysToDelete.add(new KeyVersion(directories[0] + vehicleImgTitle));
        keysToDelete.add(new KeyVersion(directories[1] + plateImgTitle));

        DeleteObjectsRequest deleteObjectsRequest = new DeleteObjectsRequest(bucket)
                .withKeys(keysToDelete);

        DeleteObjectsResult delObjRes = amazonS3.deleteObjects(deleteObjectsRequest);
        int successfulDeletes = delObjRes.getDeletedObjects().size();
        System.out.println(successfulDeletes + " objects successfully deleted.");
    }
}