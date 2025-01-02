import React from "react";
import { Button } from "./index";
import { PenSquareIcon, Loader2, Upload } from "lucide-react";

function ImgEditBtn({
    editBtnLoading,
    updateBtnLoading,
    onClickEdit,
    onClickUpdate,
    imgUploaded = false,
    ...props
}) {
    return (
        <div className="absolute right-[-15px] bottom-[5px]">
            {!imgUploaded && (
                <Button
                    type="button"
                    className=" px-2"
                    size="xs"
                    disabled={editBtnLoading}
                    onClick={onClickEdit}
                >
                    <div className="flex items-center gap-2">
                        {editBtnLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <PenSquareIcon size={20} />
                        )}
                        <span>Edit</span>
                    </div>
                </Button>
            )}
            {imgUploaded && (
                <Button
                    type="button"
                    className=" px-2"
                    size="xs"
                    disabled={updateBtnLoading}
                    onClick={onClickUpdate}
                >
                    <div className="flex items-center gap-2">
                        {updateBtnLoading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Upload size={20} />
                        )}
                        <span>Update</span>
                    </div>
                </Button>
            )}
        </div>
    );
}

export default ImgEditBtn;
