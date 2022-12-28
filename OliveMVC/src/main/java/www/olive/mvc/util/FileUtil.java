package www.olive.mvc.util;

import java.awt.image.BufferedImage;
import java.io.File;
import java.text.DecimalFormat;
import java.util.Calendar;
import java.util.UUID;

import javax.imageio.ImageIO;
import javax.servlet.http.HttpServletRequest;

import org.imgscalr.Scalr;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.multipart.MultipartFile;

public class FileUtil {
	
	public static String uploadFile(MultipartFile file, HttpServletRequest request) throws Exception {
		//System.out.println("업로드 파일에서 파일 제대로 받아왔니?" + file.getOriginalFilename() + file.getBytes().toString());
        String originalFileName = file.getOriginalFilename(); // 파일명
        byte[] fileData = file.getBytes();  // 파일 데이터
        //System.out.println("파일 데이터 오류 없니?" + fileData.toString());

        // 1. 파일명 중복 방지 처리
        String uuidFileName = getUuidFileName(originalFileName);
        //System.out.println("파일 명 수정되었니?" + uuidFileName);

        // 2. 파일 업로드 경로 설정
        String rootPath = getRootPath(originalFileName, request); // 기본경로 추출(이미지 or 일반파일)
        File _rootPath = new File(rootPath);
        System.out.println("저장경로>>>>"+_rootPath);
        System.out.println(!_rootPath.exists());
        if(!_rootPath.exists()) {
        	_rootPath.mkdirs();
        	//System.out.println("디렉토리 생성됐다!");
        }
        //System.out.println("업로드 경로 설정 확인" + rootPath);
        String datePath = getDatePath(rootPath); // 날짜 경로 추출, 날짜 폴더 생성
        //System.out.println("폴더 경로설정" + datePath);

        // 3. 서버에 파일 저장
        File target = new File(rootPath + datePath, uuidFileName); // 파일 객체 생성
        FileCopyUtils.copy(fileData, target); // 파일 객체에 파일 데이터 복사

        // 4. 이미지 파일인 경우 썸네일이미지 생성
        if (MediaUtils.getMediaType(originalFileName) != null) {
        	uuidFileName = makeThumbnail(rootPath, datePath, uuidFileName);
        }
        	String origintarget = rootPath + datePath;
        	return replaceSavedFilePath(origintarget,uuidFileName);
        
    }

    // 파일 삭제 처리
    public static void deleteFile(String fileName, HttpServletRequest request) {

        String rootPath = getRootPath(fileName, request); // 기본경로 추출(이미지 or 일반파일)

        // 1. 원본 이미지 파일 삭제
        MediaType mediaType = MediaUtils.getMediaType(fileName);
        if (mediaType != null) {
            String originalImg = fileName.substring(6, 18) + fileName.substring(20);
            //System.out.println("딜리트 오리지널 네임"+originalImg);
            new File(rootPath + originalImg.replace('/', File.separatorChar)).delete();
        }

        // 2. 파일 삭제(썸네일이미지 or 일반파일)
        fileName = fileName.substring(6);
        //System.out.println("파일이름 잘렸니?"+fileName);
        new File(rootPath + fileName.replace('/', File.separatorChar)).delete();
    }

    // 파일 출력을 위한 HttpHeader 설정
    public static HttpHeaders getHttpHeaders(String fileName) throws Exception {
        MediaType mediaType = MediaUtils.getMediaType(fileName); // 파일타입 확인
        HttpHeaders httpHeaders = new HttpHeaders();

        // 이미지 파일 O
        if (mediaType != null) {
            httpHeaders.setContentType(mediaType);
            return httpHeaders;
        }

        // 이미지 파일 X
        fileName = fileName.substring(fileName.indexOf("_") + 1); // UUID 제거
        httpHeaders.setContentType(MediaType.APPLICATION_OCTET_STREAM); // 다운로드 MIME 타입 설정
        // 파일명 한글 인코딩처리
        httpHeaders.add("Content-Disposition",
                        "attachment; filename=\"" + new String(fileName.getBytes("UTF-8"),
                                "ISO-8859-1")+"\"");

        return httpHeaders;
    }

    // 기본 경로 추출
    public static String getRootPath(String fileName, HttpServletRequest request) {
    	//System.out.println("루트패스에서 파일확인" + fileName);
        String rootPath = "c:/upload";
        MediaType mediaType = MediaUtils.getMediaType(fileName); // 파일타입 확인
        if (mediaType != null)
            return (rootPath + "/images"); // 이미지 파일 경로

        return (rootPath + "/files"); // 일반파일 경로
    }

    // 날짜 폴더명 추출
    private static String getDatePath(String uploadPath) {

        Calendar calendar = Calendar.getInstance();
        String yearPath = File.separator + calendar.get(Calendar.YEAR);
        String monthPath = yearPath + File.separator + new DecimalFormat("00").format(calendar.get(Calendar.MONTH) + 1);
        String datePath = monthPath + File.separator + new DecimalFormat("00").format(calendar.get(Calendar.DATE));

        makeDateDir(uploadPath, yearPath, monthPath, datePath);

        return datePath;
    }


    // 날짜별 폴더 생성
    private static void makeDateDir(String uploadPath, String... paths) {

        // 날짜별 폴더가 이미 존재하면 메서드 종료
        if (new File(uploadPath + paths[paths.length - 1]).exists())
            return;

        for (String path :  paths) {
            File dirPath = new File(uploadPath + path);
            if (!dirPath.exists())
                dirPath.mkdir();

        }
    }

    // 파일 저장 경로 치환
    private static String replaceSavedFilePath(String datePath, String fileName) {
        String savedFilePath = datePath + File.separator + fileName;
        return savedFilePath.replace(File.separatorChar, '/');
    }

    // 파일명 중복방지 처리
    private static String getUuidFileName(String originalFileName) {
        return UUID.randomUUID().toString() + "_" + originalFileName;
    }

    // 썸네일 이미지 생성
    private static String makeThumbnail(String uploadRootPath, String datePath, String fileName) throws Exception {

        // 원본이미지를 메모리상에 로딩
        BufferedImage originalImg = ImageIO.read(new File(uploadRootPath + datePath, fileName));
        // 원본이미지를 축소
        BufferedImage thumbnailImg = Scalr.resize(originalImg, Scalr.Method.AUTOMATIC, Scalr.Mode.FIT_TO_HEIGHT, 100);
        // 썸네일 파일명
        String thumbnailImgName = "s_" + fileName;
        // 썸네일 업로드 경로
        String fullPath = uploadRootPath + datePath + File.separator + thumbnailImgName;
        // 썸네일 파일 객체생성
        File newFile = new File(fullPath);
        // 썸네일 파일 확장자 추출
        String formatName = MediaUtils.getFormatName(fileName);
        // 썸네일 파일 저장
        ImageIO.write(thumbnailImg, formatName, newFile);

        return thumbnailImgName;
    }

}
