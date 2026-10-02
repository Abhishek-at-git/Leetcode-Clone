import { getCurrentUserData } from '@/modules/auth/actions'
import PlaylistsSection from '@/modules/playlists/components/add-to-playlist'
import { SubmissionHistory } from '@/modules/problems/components/submit-history'
import ProfileStats from '@/modules/profile/components/profile-stats'
import SolvedProblems from '@/modules/profile/components/solved-problems'
import UserInfoCard from '@/modules/profile/components/user-info-card'

const ProfilePage = async() => {
    const profileData = await getCurrentUserData();

    if (!profileData.success || !profileData.data) {
        return (
            <div className="min-h-screen py-32 flex justify-center items-center">
                <p className="text-xl text-muted-foreground">{profileData.error || "User data not found"}</p>
            </div>
        );
    }

  return (
    <div className='min-h-screen py-32'>
        <div className='container mx-auto px-4 max-w-7xl'>
            <UserInfoCard userData={profileData.data}/>

            <ProfileStats
              submissions={profileData.data?.submissions || []}
          solvedCount={profileData.data?.solvedProblems.length || 0}
          playlistCount={profileData.data?.playlists.length || 0}
            
            />

            <SubmissionHistory submissions={profileData.data?.submissions || []}/>

            <div className='grid gap-8'>
            <SolvedProblems solvedProblems={profileData.data?.solvedProblems || []}/>
              <PlaylistsSection playlists={profileData.data?.playlists || []} />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage