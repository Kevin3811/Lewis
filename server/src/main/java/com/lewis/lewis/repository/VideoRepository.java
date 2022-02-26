package com.lewis.lewis.repository;

import com.lewis.lewis.entity.VideoEntity;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface VideoRepository extends CrudRepository<VideoEntity, Long>{

    List<VideoEntity> findDistinctByPlaylistsIn(Collection<String> includedPlaylists);
    //TODO: Get the excluded filter working properly
//    @Query(value = "SELECT DISTINCT v.* " +
//            "FROM video_entity as v " +
//            "JOIN video_entity_playlists as vep ON vep.video_entity_id = v.id " +
//            "WHERE vep.playlists IN ?1 " +
//            "AND vep.playlists NOT IN ?2",
//            nativeQuery=true)
//    List<VideoEntity> filterVideosByTag(Collection<String> includedPlaylists, Collection<String> excludedPlaylists);

}
