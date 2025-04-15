import React from 'react';

import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { ProjectContainer } from '~/widgets/project/ui';
import { fetchProjectInfo } from '../api';

export default function ProjectPage() {
  const { projectId } = useParams();

  const { data, isFetched } = useQuery({
    queryKey: [`project${projectId}`],
    queryFn: () => fetchProjectInfo(projectId!),
  });

  return (
    <div className="h-full w-full p-8">
      {isFetched && <ProjectContainer {...data!.data} />}
    </div>
  );
}
