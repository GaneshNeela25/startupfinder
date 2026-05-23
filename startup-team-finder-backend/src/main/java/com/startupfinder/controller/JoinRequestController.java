package com.startupfinder.controller;

import com.startupfinder.model.JoinRequest;
import com.startupfinder.model.Team;

import com.startupfinder.repository.JoinRequestRepository;
import com.startupfinder.repository.TeamRepository;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.io.File;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

import java.util.List;

@RestController
@RequestMapping("/requests")
@CrossOrigin("*")

public class JoinRequestController {

    @Autowired
    private JoinRequestRepository joinRequestRepository;

    @Autowired
    private TeamRepository teamRepository;

    // SEND REQUEST
    @PostMapping("/send")
    public JoinRequest sendRequest(

            @RequestParam("message")
            String message,

            @RequestParam("role")
            String role,

            @RequestParam("userId")
            Long userId,

            @RequestParam("teamId")
            Long teamId,

            @RequestParam("userName")
            String userName,

            @RequestParam(
                    value = "resume",
                    required = false
            )

            MultipartFile resume

    ) throws Exception {

        JoinRequest request =
                new JoinRequest();

        request.setMessage(message);

        request.setRole(role);

        request.setUserId(userId);

        request.setTeamId(teamId);

        request.setUserName(userName);

        request.setStatus("PENDING");

        // SAVE RESUME
        if (resume != null) {

            String fileName =

                    System.currentTimeMillis()
                            + "_"
                            + resume.getOriginalFilename();

            File uploadDir =
                    new File("uploads");

            if (!uploadDir.exists()) {

                uploadDir.mkdirs();

            }

            Path filePath =

                    Paths.get(
                            "uploads",
                            fileName
                    );

            Files.copy(

                    resume.getInputStream(),

                    filePath,

                    StandardCopyOption.REPLACE_EXISTING

            );

            request.setResumeFileName(
                    fileName
            );

        }

        return joinRequestRepository.save(
                request
        );

    }

    // GET REQUESTS FOR FOUNDER
    @GetMapping("/founder/{founderId}")

    public List<JoinRequest>
    getFounderRequests(

            @PathVariable
            Long founderId

    ) {

        List<Team> founderTeams =

                teamRepository.findByOwnerId(
                        founderId
                );

        List<Long> teamIds =

                founderTeams.stream()

                        .map(Team::getId)

                        .toList();

        return joinRequestRepository
                .findByTeamIdIn(teamIds);

    }

    // UPDATE STATUS
    @PutMapping("/{id}")

    public JoinRequest updateRequestStatus(

            @PathVariable Long id,

            @RequestBody
            JoinRequest updatedRequest

    ) {

        JoinRequest request =

                joinRequestRepository
                        .findById(id)
                        .orElseThrow();

        request.setStatus(
                updatedRequest.getStatus()
        );

        return joinRequestRepository.save(
                request
        );

    }

    // GET USER REQUESTS
    @GetMapping("/user/{userId}")
public List<JoinRequest> getUserRequests(
        @PathVariable Long userId
) {

    List<JoinRequest> requests =
            joinRequestRepository.findAll();

    return requests.stream()

            .filter(req ->

                    req.getUserId()
                            .equals(userId)

                    &&

                    req.getStatus()
                            .equalsIgnoreCase(
                                    "APPROVED"
                            )

            )

            .toList();

}
}