// package com.example.demo.repository;
//
// import com.example.demo.model.LoginUser;
//
// import org.springframework.data.jpa.repository.JpaRepository;
// import org.springframework.stereotype.Repository;
//
// import java.util.Optional;
//
// @Repository
// public interface LoginRepo extends JpaRepository<LoginUser, Long> {
//    Optional<LoginUser> findByUsername(String username);
//
//    //    @Modifying
//    //    @Transactional
//    //    @Query("UPDATE loginuser o SET o.description = :description where o.id = :id")
//    //    Optional<LoginUser> updateUserInfo(String username, String password, String
// description);
//    //
//    //
//    //    @Modifying
//    //    @Transactional
//    //    @Query("DELETE FROM loginuser o WHERE o.id = :id")
//    //    void deleteUserInfo(Long id);
//
//    boolean existsByUsername(String username);
// }
