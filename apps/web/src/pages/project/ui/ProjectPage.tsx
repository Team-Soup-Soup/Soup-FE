import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { ProjectContainer } from '~/widgets/project/ui';
import { useFetchProjectInfo } from '../api';

export default function ProjectPage() {
  const { projectId } = useParams();

  const { data, refetch: fetchProjectInfo } = useFetchProjectInfo(projectId!);

  useEffect(() => {
    fetchProjectInfo();
  }, [fetchProjectInfo, projectId]);

  return (
    <div className="h-full w-full p-8">
      {data ? <ProjectContainer {...data} /> : <></>}
    </div>
  );
}
