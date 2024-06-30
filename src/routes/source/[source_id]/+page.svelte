<script>
    import { page } from "$app/stores";
    import { onMount } from "svelte";
    import { marked } from "marked";


    let source_id = $page.params.source_id;

    

    let outline_html = undefined;

    onMount(async () => {
        const server_url = 'http://localhost:8080'
        // const server_url = 'https://api.babotree.com'
        const resource_url = `${server_url}/source/outline/${source_id}`
        const res = await fetch(resource_url)
        const data = await res.json()
        outline_html = data.outline_html;
        console.log("OUTLINE_HTML");
        console.log(outline_html);
    })

</script>

<div>
    Outline
    {#if outline_html}
        <div class="flex-row items-center">
            <div class="prose p-8">
                {@html outline_html}
            </div>
        </div>
        
    {/if}
</div>

<style lang="postcss">
    h1 {
        font-size: 2.5rem;
    }
</style>