import data from './mockData';
import { notFound } from 'next/navigation';
import Link from 'next/link';
export default function VideoShow({ params }){
    const videos = data.videos;
    const { videoId } = params;
    
    if(!videos?.[videoId]){
        notFound();
    }
    
    const { id, resourceId, src, resourceType } = videos[videoId];
    return(
        <main style={{height: "100vh", width:"100vw", textAlign: "center", padding: "100px 0"}}>
            <h1>VideoId: {videoId}</h1>
            <p>Resource: {JSON.stringify(videos[videoId])}</p>
            <Link href="/">Back to Root</Link><br/>
            <iframe
                src={src}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
            >
            </iframe>
            <h5>Navigation</h5>
            <nav style={{display: "flex", flexDirection: "column"}}>
                <Link href="./index">Back to Index</Link>
                {Object.entries(videos).map(([id, video]) => {
                    return <Link key={id} href={`./${id}`}>Video {id}</Link>
                })}
                <Link href="./1000">This video doesn't exist.</Link>
            </nav>
        </main>
    )
}