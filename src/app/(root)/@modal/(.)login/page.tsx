import {Modal} from "@/components/UI/modal";
import Auth from "../../../../components/auth";

export default async function Page() {
    return (
        <Modal>
            <Auth type={'login'}/>
        </Modal>
    )
}