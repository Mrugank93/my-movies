import dynamic from 'next/dynamic';
import { getApiDocs } from '../../../lib/swagger';

const ReactSwagger = dynamic(() => import('./ReactSwagger'), { ssr: false });

export default async function IndexPage() {
    const spec: Record<string, any> = await getApiDocs();
    return (
        <section className='container'>
            <ReactSwagger spec={spec} />
        </section>
    )
}
