import Auth from "@/components/auth";
import Modal from "@/components/UI/modal";

export default async function Page() {
    return (
        <Modal>
            <Auth type={'login'}/>
        </Modal>
    )
}