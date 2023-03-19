import React from 'react'
import { Text, View, SafeAreaView, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import { Stack } from 'expo-router';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router';
import { useState, useCallback } from 'react';
import {Company, JobAbout, JobFooter, JobTabs, ScreenHeaderBtn, Specifics} from "../../components";
import { COLORS, icons, SIZES } from '../../constants';
import useFetch from '../../hooks/useFetch';

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const {data, isLoading, error, refetch} = useFetch('job-details', {
        job_id:params.id
    })
  return (
    <View>
        <Text>JobDetails</Text>
    </View>
  )
}

export default JobDetails;