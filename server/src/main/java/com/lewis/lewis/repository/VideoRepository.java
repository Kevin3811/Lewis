package com.lewis.lewis.repository;

import com.lewis.lewis.entity.VideoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VideoRepository extends CrudRepository<VideoEntity, Long>{

    List<VideoEntity> findByPlaylists(String playlist);

}
