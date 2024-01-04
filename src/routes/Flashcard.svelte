<script>
    import { Card } from 'flowbite-svelte';
    export let question;
    export let answer;
</script>

<Card class="h-full">
    <div class="max-w-xl p-4">{question}</div>
    <hr>
    <div class="max-w-xl p-4">{answer}</div>
</Card>